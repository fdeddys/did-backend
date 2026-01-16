import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UtilHdr } from "./entities/util-hdr.entity";
import { Repository } from "typeorm";
import { UtilDtl } from "./entities/util-dtl.entity";


@Injectable()
export class UtilityService {

    constructor(
        @InjectRepository(UtilHdr) 
        private utilHdrRepository : Repository<UtilHdr>,
        @InjectRepository(UtilDtl)
        private utilDtlRepository: Repository<UtilDtl>
    ){}

    async findDetailsByHdr(hdrName: string) {
        return await this.utilDtlRepository.find({
            where: {
                hdr: {
                    name: hdrName.toUpperCase()
                }
            },
            select: {
                id: true,
                name: true
            }
        })
    }

    async createHdr(name: string) {
        return await this.utilHdrRepository.save({
            name: name
        })
    }

    async createDtl(hdrId: string, name: string){
        return await this.utilDtlRepository.save({
            hdr:{
                id : hdrId
            },
            name: name
        })
    }
    
}