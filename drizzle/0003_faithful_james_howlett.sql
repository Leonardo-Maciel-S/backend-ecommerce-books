CREATE TABLE "user_address" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"number" integer,
	"street" text NOT NULL,
	"neighborhood" text NOT NULL,
	"phone" text NOT NULL,
	"recipientName" text NOT NULL,
	"cpfOrCnpj" text NOT NULL
);
