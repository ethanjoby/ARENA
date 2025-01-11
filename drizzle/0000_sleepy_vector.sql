CREATE TABLE "counselors" (
	"id" text PRIMARY KEY NOT NULL,
	"fullname" text NOT NULL,
	"email" text NOT NULL,
	"hashedPassword" text NOT NULL,
	"phoneNumber" text NOT NULL,
	CONSTRAINT "counselors_email_unique" UNIQUE("email"),
	CONSTRAINT "counselors_phoneNumber_unique" UNIQUE("phoneNumber")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"fullname" text NOT NULL,
	"grade" integer NOT NULL,
	"email" text NOT NULL,
	"hashedPassword" text NOT NULL,
	"phoneNumber" text NOT NULL,
	"counselorId" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phoneNumber_unique" UNIQUE("phoneNumber")
);
