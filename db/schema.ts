import { integer, text, pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
    id: text().notNull().primaryKey(),
    fullname: text().notNull(), 
    grade: integer().notNull(), 
    email: text().notNull().unique(), 
    hashedPassword: text().notNull(), 
    phoneNumber: text().notNull().unique(),
    counselorId: text().notNull(), 
}); 

export const userRelations = relations(users, ({ one, many }) => ({
    counselor: one(counselors, {
        fields: [users.counselorId],
        references: [counselors.id],
    }),
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
}));

//need to add db tables fro authentication/sessions (use google oath), and scheduling software, as well as what classes the user is in and the what users the counselors teach etc....
