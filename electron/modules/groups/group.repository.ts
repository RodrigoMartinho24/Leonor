import { GroupCreateRequest } from "../../../shared/dtos/group-create.request";
import { GroupType } from "../../../shared/enums/group-type";
import { db } from "../../database/db";
import { eq } from "drizzle-orm";
import { groups } from "../../database/schema/group.schema";

export class GroupRepository {
    public getAll() {
        return db.select().from(groups);
    }

    public getByType(type: GroupType) {
        return db.select().from(groups).where(eq(groups.type, type));;
    }

    public create(group: GroupCreateRequest) {
        return db.insert(groups).values(group);
    }

    public delete(groupId: number) {
        return db.delete(groups).where(eq(groups.id, groupId));
    }
}