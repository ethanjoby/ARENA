import { integer, text, pgTable, jsonb, timestamp, boolean, primaryKey, date } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

interface UserScheduleData {
    events: { title: string; date: string; details?: string }[];
}

interface CounselorScheduleData {
    availability: { day: string; timeSlots: string[] }[];
}

interface ClassData {
    syllabus: string[];
    resources: { name: string; link: string }[];
}

interface MeetingData {
    notes: { name: string, text: string }[]; 
}

export const users = pgTable("users", {
    id: text().notNull().primaryKey(),
    fullname: text().notNull(), 
    grade: integer().notNull(), 
    email: text().notNull().unique(), 
    hashedPassword: text().notNull(), 
    phoneNumber: text().notNull().unique(),
    scheduleId: text(),
    meetingId: text(),
    counselorId: text().notNull(), 
}); 

export const userRelations = relations(users, ({ one, many }) => ({
    counselor: one(counselors, {
        fields: [users.counselorId],
        references: [counselors.id],
    }),
    schedule: one(userSchedule, {
        fields: [users.scheduleId],
        references: [userSchedule.userId]
    }), 
    userToClasses: many(usersOnClasses), 
    meetings: one(meetings, {
        fields: [users.meetingId],
        references: [meetings.userId],
    })
})); 

export const counselors = pgTable("counselors", {
    id: text().notNull().primaryKey(),
    fullname: text().notNull(), 
    email: text().notNull().unique(), 
    hashedPassword: text().notNull(), 
    phoneNumber: text().notNull().unique(),
});

export const counselorRelations = relations(counselors, ({ one, many }) => ({
    users: many(users),
    userSchedule: many(userSchedule), 
    counselorSchedule: one(counselorSchedules, {
        fields: [counselors.id],
        references: [counselorSchedules.counselorId], 
    }), 
    classes: many(classes), 
    meetings: many(meetings), 
}));

export const userSchedule = pgTable("user_schedules", {
    id: text().notNull().primaryKey(), 
    userId: text().references(() => users.id), 
    data: jsonb().default({ events: [] } as UserScheduleData),
    updatedAt: timestamp().notNull().defaultNow(), 
    counselorId: text().references(() => counselors.id), 
});

export const userScheduleRelations = relations(userSchedule, ({ one, many }) => ({
    users: one(users, {
        fields: [userSchedule.userId],
        references: [users.id], 
    }),
    counselor: one(counselors, {
        fields: [userSchedule.counselorId],
        references: [counselors.id], 
    })
}));

export const counselorSchedules = pgTable("counselor_schedules", {
    id: text().notNull().primaryKey(), 
    counselorId: text().references(() => counselors.id), 
    data: jsonb().default({ availability: [] } as CounselorScheduleData),
    updatedAt: timestamp().notNull().defaultNow(), 
}); 

export const counselorSchedulesRelations = relations(counselorSchedules, ({ one, many }) => ({
    counselor: one(counselors, {
        fields: [counselorSchedules.counselorId],
        references: [counselors.id], 
    }),
})); 

export const classes = pgTable("classes", { 
    id: text().notNull().primaryKey(), 
    name: text().notNull(), 
    isPrivate: boolean().notNull().default(false), 
    counselorId: text().references(() => counselors.id),
    data: jsonb().default({ syllabus: [], resources: [] } as ClassData),
    updatedAt: timestamp().notNull().defaultNow(), 
});

export const classesRelations = relations(classes, ({ one, many }) => ({
    users: many(usersOnClasses), 
    counselor: one(counselors, {
        fields: [classes.counselorId],
        references: [counselors.id], 
    })
}));

//MAKE SURE THAT YOU SET userId not as userid, OTHERWISE DRIZZE WILL THINKT HAT YOU ARE TRYTING TO ACCESS users.id AS A PRIMARY KEY 
export const usersOnClasses = pgTable("users_classes", {
    userId: text().references(() => users.id), 
    classesId: text().references(() => classes.id), 
}, (t) => ({ 
    pk: primaryKey({ columns: [t.userId, t.classesId] }) 
})); 

export const usersOnClassesRelations = relations(usersOnClasses, ({ one, many }) => ({
    user: one(users, {
        fields: [usersOnClasses.userId],
        references: [users.id], 
    }),
    class: one(classes, {
        fields: [usersOnClasses.classesId],
        references: [classes.id], 
    }),
})); 

export const meetings = pgTable("meetings", {
    id: text().notNull().primaryKey(), 
    counselorId: text().notNull().references(() => counselors.id), 
    userId: text().notNull().references(() => users.id), 
    meetingDate: date(), 
    data: jsonb().default({ notes: [] } as MeetingData), 
    updatedAt: timestamp().notNull().defaultNow(), 
})

export const meetingsRelations = relations(meetings, ({ one, many }) => ({
    counselor: one(counselors, {
        fields: [meetings.counselorId],
        references: [counselors.id]
    }), 
    users: one(users, {
        fields: [meetings.userId], 
        references: [users.id], 
    }), 
}))

//make classes system better

//update all the default json values into something that typescript can understand and we cna make interfaces for ...
//integerate some sort of messaging on platform?

//need to add db tables fro authentication/sessions (use google oath), and scheduling software, as well as what classes the user is in and the what users the counselors teach etc....