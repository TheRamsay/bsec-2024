CREATE TABLE IF NOT EXISTS "stocks" (
	"id" serial PRIMARY KEY NOT NULL,
	"security_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"amount" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"supabase_uid" uuid,
	"username" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"balance" numeric NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "transactions" RENAME TO "securities";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stocks" ADD CONSTRAINT "stocks_security_id_securities_id_fk" FOREIGN KEY ("security_id") REFERENCES "securities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stocks" ADD CONSTRAINT "stocks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
