CREATE TABLE "book" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"author" text NOT NULL,
	"synopsis" text,
	"priceInCents" integer NOT NULL,
	"coverImg" text,
	"evaluation" real,
	"userId" uuid
);
