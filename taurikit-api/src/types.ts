export interface Env {
  DB: D1Database;
  TEMPLATES: R2Bucket;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  STRIPE_PRICE_ID: string;
  RESEND_API_KEY: string;
}

export interface License {
  id: string;
  email: string;
  key: string;
  plan: string;
  active: number;
  stripe_customer_id: string | null;
  stripe_payment_id: string | null;
  created_at: string;
  last_used: string | null;
}
