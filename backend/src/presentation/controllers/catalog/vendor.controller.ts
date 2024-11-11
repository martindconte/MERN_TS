import { Request, Response } from 'express';
import { CreateVendorDTO, QueriesVendorDTO, UpdateVendorDTO, VendorRepository, VendorUseCase } from '../../../domain';

export class VendorController {

    constructor(
        private readonly vendorRepository: VendorRepository
    ) {}

    createVendor = ( req: Request, res: Response ) => {
        const [ error, vendorDTO ] = CreateVendorDTO.create( req.body )
        if( error ) return res.status(400).json({ msg: error })
        
        new VendorUseCase.CreateVendor( this.vendorRepository )
            .execute( vendorDTO! )
            .then( vendor => res.json({
                status: 'success',
                msg: 'The Vendor has been registred successfully',
                payload: vendor
            }))
            .catch( error => {
                console.log(error);
                res.status(400).json({
                status: 'error',
                msg: error.message || error
            })} )
    };

    getAllVendors = ( req: Request, res: Response ) => {
        new VendorUseCase.GetVendors( this.vendorRepository )
            .execute()
            .then( vendor => res.json( vendor ) )
            .catch( error => res.status(400).json({ error }) )
    };

    getAllDeletedVendors = ( req: Request, res: Response ) => {
        new VendorUseCase.GetDeleteVendors( this.vendorRepository )
            .execute()
            .then( vendor => res.json( vendor ) )
            .catch( error => res.status(400).json({
                status: 'error',
                msg: error
            }))
    }

    getVendorById = ( req: Request, res: Response ) => {
        const { vendorid } = req.params
        const queries = QueriesVendorDTO.create( req.query )
        new VendorUseCase.GetVendor( this.vendorRepository )
            .execute( vendorid, queries )
            .then( vendor => res.json( vendor ) )
            .catch( error => res.status(400).json({ error }) )
    };

    updateVendor = ( req: Request, res: Response ) => {
        const { vendorid } = req.params
        const queries = QueriesVendorDTO.create( req.query )
        const [ error, updateVendorDTO ] = UpdateVendorDTO.create({ id: vendorid, ...req.body })
        if( error ) return res.status(400).json({ error })
        new VendorUseCase.UpdateCentral( this.vendorRepository )
            .execute( updateVendorDTO!, queries )
            .then( vendor => res.json({
                msg: 'Vendor Information has been updated successfully',
                payload: vendor
            }))
            .catch( error => res.status(400).json({
                status: 'error',
                msg: error
            }))
    };

    deleteVendor = ( req: Request, res: Response ) => {
        const { vendorid } = req.params

        new VendorUseCase.DeleteVendor( this.vendorRepository )
            .execute( vendorid )
            .then( vendor => res.json({
                msg: "The vendor has been soft deleted. You can find it in the 'Deleted Vendors' section to restore or permanently delete it",
                payload: vendor
            }))
            .catch( error => res.status(400).json({
                status: 'error',
                msg: error
            }))
    };

    cleanVendor = ( req: Request, res: Response ) => {
        const { vendorid } = req.params
        new VendorUseCase.CleanVendor( this.vendorRepository )
            .execute( vendorid )
            .then( vendor => res.json({
                msg: 'The vendor has been permanently deleted. This action cannot be undone',
                payload: vendor
            }))
            .catch( error => res.status(400).json({
                status: 'error',
                msg: error
            }))
    };
}