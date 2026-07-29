CREATE TABLE `groups` (
	`id` integer PRIMARY KEY,
	`title` text NOT NULL,
	`type` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `music` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`title` text NOT NULL,
	`lyrics` text,
	`groupId` integer NOT NULL,
	CONSTRAINT `fk_music_groupId_groups_id_fk` FOREIGN KEY (`groupId`) REFERENCES `groups`(`id`)
);
