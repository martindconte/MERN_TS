import { UpdateSubrackDTO, UpdateVendorDTO } from "../../../dtos";
import { SubrackEntity } from "../../../entities/catalog/subrack.entity";
import { VendorEntity } from "../../../entities/catalog/vendor.entity";
import { SubrackRepository } from "../../../repositories/catalog/subrack.repository";
import { VendorRepository } from "../../../repositories/catalog/vendor.repository";

export interface UpdateSubrackUseCase {
    execute( dto: UpdateSubrackDTO ): Promise<SubrackEntity>
}

export class UpdateSubrack implements UpdateSubrackUseCase {
    constructor(
        private readonly repository: SubrackRepository
    ) {}
    execute( dto: UpdateSubrackDTO ): Promise<SubrackEntity> {
        return this.repository.updateById( dto );
    }
}