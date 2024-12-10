import { CreateVendorDTO, QueriesVendorDTO, UpdateVendorDTO, VendorDataSource, VendorRepository } from '../../../domain';
import { IVendor, IVendorsDeleted } from '../../../interface';

export class VendorRepositoryImpl implements VendorRepository {
  constructor(
    private readonly datasource: VendorDataSource
) {}
  create(createVendorDTO: CreateVendorDTO): Promise<IVendor> {
    return this.datasource.create(createVendorDTO);
  }
  getAll(): Promise<IVendor[]> {
    return this.datasource.getAll();
  }
  getById(id: IVendor['id'], queries?: QueriesVendorDTO): Promise<IVendor> {
    return this.datasource.getById(id, queries);
  }
  updateById(updateVendorDTO: UpdateVendorDTO, queries?: QueriesVendorDTO): Promise<IVendor> {
    return this.datasource.updateById(updateVendorDTO, queries);
  }
  deleteById(id: IVendor['id']): Promise<IVendor> {
    return this.datasource.deleteById(id);
  }
  getAllDeleted(): Promise<IVendorsDeleted> {
    return this.datasource.getAllDeleted();
  }
  cleanVendor(id: IVendor['id']): Promise<IVendor> {
    return this.datasource.cleanVendor(id);
  }
}
