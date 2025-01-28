CREATE TABLE "counselor_schedules" (
	"id" text PRIMARY KEY NOT NULL,
	"counselorId" text,
	"data" jsonb DEFAULT '{"booked":[]}'::jsonb,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "initial_profiles" (
	"id" text PRIMARY KEY NOT NULL,
	"data" jsonb DEFAULT '{"profile":{}}'::jsonb
);
--> statement-breakpoint
CREATE TABLE "meetings" (
	"id" text PRIMARY KEY NOT NULL,
	"counselorId" text NOT NULL,
	"userId" text NOT NULL,
	"meetingDate" date,
	"data" jsonb DEFAULT '{"notes":[]}'::jsonb,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "counselorTables" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "counselorTables" CASCADE;--> statement-breakpoint
ALTER TABLE "users_classes" RENAME COLUMN "userid" TO "fkUserId";--> statement-breakpoint
ALTER TABLE "users_classes" RENAME COLUMN "classesId" TO "fkClassId";--> statement-breakpoint
ALTER TABLE "users_classes" DROP CONSTRAINT "users_classes_userid_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users_classes" DROP CONSTRAINT "users_classes_classesId_classes_id_fk";
--> statement-breakpoint
ALTER TABLE "users_classes" DROP CONSTRAINT "users_classes_userid_classesId_pk";--> statement-breakpoint
ALTER TABLE "users_classes" ADD CONSTRAINT "users_classes_fkUserId_fkClassId_pk" PRIMARY KEY("fkUserId","fkClassId");--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "meetingId" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profileId" text;--> statement-breakpoint
ALTER TABLE "counselor_schedules" ADD CONSTRAINT "counselor_schedules_counselorId_counselors_id_fk" FOREIGN KEY ("counselorId") REFERENCES "public"."counselors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_counselorId_counselors_id_fk" FOREIGN KEY ("counselorId") REFERENCES "public"."counselors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_profileId_initial_profiles_id_fk" FOREIGN KEY ("profileId") REFERENCES "public"."initial_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_classes" ADD CONSTRAINT "users_classes_fkUserId_users_id_fk" FOREIGN KEY ("fkUserId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_classes" ADD CONSTRAINT "users_classes_fkClassId_classes_id_fk" FOREIGN KEY ("fkClassId") REFERENCES "public"."classes"("id") ON DELETE no action ON UPDATE no action;