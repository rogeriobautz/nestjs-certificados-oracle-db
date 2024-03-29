import { DateTime } from 'luxon';
import { Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import * as momenttz from 'moment-timezone';


@Entity({ name: 'CERT_OPB', schema: 'OCLOPB' })
export class Certificado {

    constructor(uuid: string, owner: string, expiration_date: string, timestamp_last_change: Date) {
        this.uuid = uuid;
        this.owner = owner;
        this.expiration_date = expiration_date;
        this.timestamp_last_change = timestamp_last_change;
    }


    @PrimaryColumn({name: "UUID", length: 36})
    uuid: string;

    @Column({name: "OWNER"})
    owner: string;

    @Column({name: "EXP_DATE", type: 'date'})
    expiration_date: string;

    @Column({name: "TS_LST_CHANGE", type: 'timestamp', 
    transformer: { 
        from(value: Date){ 
            return new Date(value.getTime() - (value.getTimezoneOffset() * 60 * 1000)) },
        to(value: any) { return value }
     } 
    })
    timestamp_last_change: Date;    

}

