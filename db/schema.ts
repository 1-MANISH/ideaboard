import { boolean, integer, jsonb, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
        id: serial("id").primaryKey(),
        name: text("name"),
        email: text("email").notNull().unique(),
        credits:integer('credits').default(3),
        createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const boards = pgTable("boards",{
        id: serial("id").primaryKey(),
        boardId:varchar("boardId").notNull().unique(),
        boardName:varchar('boardName').notNull(),
        userEmail:varchar("userEmail").notNull(),
        isDeleted:boolean('isDeleted').default(false),
        createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const whiteboardData = pgTable("whiteboardData",{
        id: serial("id").primaryKey(),
        boardId:varchar("boardId").notNull().unique().references(()=>boards.boardId),
        elements:jsonb('elements'),
        appState:jsonb('appState'),
        files:jsonb('files'),
        previewImage:text("previewImage"),
        updatedAt:timestamp("created_at").defaultNow().notNull(),
})

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
