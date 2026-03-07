pub const FRAME_COUNT: usize = 4;
pub const CELEBRATE_FRAME: usize = 4;

const FRAMES: [&str; 5] = [
    // Frame 0: idle
    r#"
    _~^~^~_
  \) /  o o\ (/
    '_   -  _'
    / '-----' \
 "#,
    // Frame 1: working – left claw up
    r#"
    _~^~^~_
 \)  /  o o\ /
    '_   -  _'
    / '-----' \
 "#,
    // Frame 2: idle alt
    r#"
    _~^~^~_
  \) /  o o\ (/
    '_   ~  _'
    / '-----' \
 "#,
    // Frame 3: working – right claw up
    r#"
    _~^~^~_
   \ /  o o\  (/
    '_   -  _'
    / '-----' \
 "#,
    // Frame 4: celebrating – both claws up
    r#"
    _~^~^~_
 \)  /  ^ ^\  (/
    '_   ▽  _'
    / '-----' \
 "#,
];

pub fn frame_at(tick: usize) -> &'static str {
    &FRAMES[tick % FRAME_COUNT]
}

pub fn celebrate() -> &'static str {
    &FRAMES[CELEBRATE_FRAME]
}
