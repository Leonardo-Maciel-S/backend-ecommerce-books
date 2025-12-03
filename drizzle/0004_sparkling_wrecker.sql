ALTER TABLE "user_address" ADD COLUMN "complement" text;--> statement-breakpoint
ALTER TABLE "user_address" ADD COLUMN "city" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user_address" ADD COLUMN "state" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user_address" ADD COLUMN "zipCode" text NOT NULL;