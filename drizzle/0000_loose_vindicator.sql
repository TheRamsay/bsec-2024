CREATE TABLE IF NOT EXISTS "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"bic" varchar NOT NULL,
	"isin" varchar NOT NULL,
	"price" numeric NOT NULL,
	"min" numeric NOT NULL,
	"max" numeric NOT NULL,
	"positive_case" double precision NOT NULL,
	"negative_case" double precision NOT NULL,
	"neutral_case" double precision NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
