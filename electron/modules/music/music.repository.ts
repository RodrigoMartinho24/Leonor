import { db } from "../../database/db";
import { eq } from "drizzle-orm";
import { music } from "../../database/schema/music.schema";

export class MusicRepository {
    // public getAll() {
    //     return db.select().from(groups);
    // }

    public getByGroupId(groupId: number) {
        return db.select().from(music).where(eq(music.groupId, groupId));;
    }

    // public create(group: GroupCreateRequest) {
    //     return db.insert(groups).values(group);
    // }
}