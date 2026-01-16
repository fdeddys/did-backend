import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UtilityService } from "./util.service";


@Controller('utility')
export class UtilityController {
    
    constructor(
        private readonly utilityService: UtilityService
    ){}

    @Post('header')
    createHeader(@Body('name') name: string) {
        return this.utilityService.createHdr(name);
    }

    @Post('detail')
    createDetail(@Body('hdrId')hdrId: string, @Body('name') name: string) {
        return this.utilityService.createDtl(hdrId, name)
    }

    @Get('list/:hdrname')
    getListDetail(@Param('hdrname')hdrname: string) {
        return this.utilityService.findDetailsByHdr(hdrname)
    }

}