"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMockUser1655326231951 = void 0;
class CreateMockUser1655326231951 {
    async up(queryRunner) {
        await queryRunner.query(`INSERT INTO "user"("username", "email", "password", "createdAt", "updatedAt") VALUES ('bob', 'bob@bob.com', '$argon2i$v=19$m=4096,t=3,p=1$rsirmGYAolkYEzD+SNQQCQ$s6REMw+74Mt6gn2ZWqtCyziGCZ3VgjwkOUfpUvhcC/I', DEFAULT, DEFAULT)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
exports.CreateMockUser1655326231951 = CreateMockUser1655326231951;
//# sourceMappingURL=1655326231951-CreateMockUser.js.map