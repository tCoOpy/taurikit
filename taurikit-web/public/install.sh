#!/bin/sh
set -eu

REPO="Demoen/taurikit-cli"
BIN_NAME="taurikit"
INSTALL_DIR="${TAURIKIT_INSTALL_DIR:-$HOME/.taurikit/bin}"

main() {
    need_cmd curl
    need_cmd tar
    need_cmd uname

    local os arch target
    os="$(detect_os)"
    arch="$(detect_arch)"
    target="${os}-${arch}"

    local version
    version="${TAURIKIT_VERSION:-$(fetch_latest_version)}"

    printf "Installing taurikit %s (%s)...\n" "$version" "$target"

    local url="https://github.com/${REPO}/releases/download/${version}/taurikit-${target}.tar.gz"
    local tmpdir
    tmpdir="$(mktemp -d)"
    trap 'rm -rf "$tmpdir"' EXIT

    printf "  Downloading %s\n" "$url"
    curl -fsSL "$url" -o "${tmpdir}/taurikit.tar.gz"
    tar xzf "${tmpdir}/taurikit.tar.gz" -C "$tmpdir"

    mkdir -p "$INSTALL_DIR"
    mv "${tmpdir}/${BIN_NAME}" "${INSTALL_DIR}/${BIN_NAME}"
    chmod +x "${INSTALL_DIR}/${BIN_NAME}"

    printf "  Installed to %s/%s\n" "$INSTALL_DIR" "$BIN_NAME"

    if ! echo "$PATH" | tr ':' '\n' | grep -qx "$INSTALL_DIR"; then
        printf "\n  Add taurikit to your PATH:\n"
        printf "    export PATH=\"%s:\$PATH\"\n\n" "$INSTALL_DIR"
        add_to_shell_profile "$INSTALL_DIR"
    fi

    printf "Done. Run 'taurikit --help' to get started.\n"
}

detect_os() {
    case "$(uname -s)" in
        Linux*)  echo "linux" ;;
        Darwin*) echo "macos" ;;
        MINGW*|MSYS*|CYGWIN*) echo "windows" ;;
        *) err "Unsupported OS: $(uname -s)" ;;
    esac
}

detect_arch() {
    case "$(uname -m)" in
        x86_64|amd64)   echo "x86_64" ;;
        aarch64|arm64)  echo "aarch64" ;;
        *) err "Unsupported architecture: $(uname -m)" ;;
    esac
}

fetch_latest_version() {
    local url="https://api.github.com/repos/${REPO}/releases/latest"
    curl -fsSL "$url" | sed -n 's/.*"tag_name": *"\([^"]*\)".*/\1/p'
}

add_to_shell_profile() {
    local dir="$1"
    local line="export PATH=\"${dir}:\$PATH\""
    local profile=""

    if [ -n "${ZSH_VERSION:-}" ] || [ -f "$HOME/.zshrc" ]; then
        profile="$HOME/.zshrc"
    elif [ -f "$HOME/.bashrc" ]; then
        profile="$HOME/.bashrc"
    elif [ -f "$HOME/.profile" ]; then
        profile="$HOME/.profile"
    fi

    if [ -n "$profile" ] && ! grep -qF "$dir" "$profile" 2>/dev/null; then
        printf "\n# TauriKit\n%s\n" "$line" >> "$profile"
        printf "  Added to %s (restart your shell or run: source %s)\n" "$profile" "$profile"
    fi
}

need_cmd() {
    if ! command -v "$1" > /dev/null 2>&1; then
        err "Required command '$1' not found"
    fi
}

err() {
    printf "error: %s\n" "$1" >&2
    exit 1
}

main "$@"
