import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id = undefined;

    @Column("varchar")
    firstName = "";

    @Column("varchar")
    lastName = "";

    @Column({
        nullable: true,
        type: "enum",
        enum: ["Admin","Administracion","Dirección","Coordinación","Nutrición","Pediatria","Psicopedagogía","Atención Temprana","Trabajo Social","Fonoaudiología"]
      })
    rol = undefined;

    @Column({ name: "email", unique: true, type: "varchar" })
    email = "";

    @Column({ type: "varchar", default: null })
    password = "";

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt = null;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt = null;

    @Column({ type: "boolean", default: true, nullable: true })
    isEnabled = true;

    @Column({ type: "int", name: "centerId", nullable: true })
    centerId = undefined;
}