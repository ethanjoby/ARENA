CREATE TABLE "classes" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"isPrivate" boolean DEFAULT false NOT NULL,
	"counselorId" text,
	"data" jsonb DEFAULT '{"syllabus":[],"resources":[]}'::jsonb,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "counselorTables" (
	"id" text PRIMARY KEY NOT NULL,
	"counselorId" text,
	"data" jsonb DEFAULT '{"availability":[]}'::jsonb,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_schedules" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text,
	"data" jsonb DEFAULT '{"events":[]}'::jsonb,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"counselorId" text
);
--> statement-breakpoint
CREATE TABLE "users_classes" (
	"userid" text,
	"classesId" text,
	CONSTRAINT "users_classes_userid_classesId_pk" PRIMARY KEY("userid","classesId")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "scheduleId" text;--> statement-breakpoint
ALTER TABLE "classes" ADD CONSTRAINT "classes_counselorId_counselors_id_fk" FOREIGN KEY ("counselorId") REFERENCES "public"."counselors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "counselorTables" ADD CONSTRAINT "counselorTables_counselorId_counselors_id_fk" FOREIGN KEY ("counselorId") REFERENCES "public"."counselors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_schedules" ADD CONSTRAINT "user_schedules_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_schedules" ADD CONSTRAINT "user_schedules_counselorId_counselors_id_fk" FOREIGN KEY ("counselorId") REFERENCES "public"."counselors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_classes" ADD CONSTRAINT "users_classes_userid_users_id_fk" FOREIGN KEY ("userid") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_classes" ADD CONSTRAINT "users_classes_classesId_classes_id_fk" FOREIGN KEY ("classesId") REFERENCES "public"."classes"("id") ON DELETE no action ON UPDATE no action;