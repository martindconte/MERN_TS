import { Request, Response } from 'express';
import { CreateVendorDTO, UpdateVendorDTO, VendorRepository, VendorUseCase } from '../../../domain';

export class VendorController {

    constructor(
        private readonly vendorRepository: VendorRepository
    ) {}

    createVendor = ( req: Request, res: Response ) => {
        const [ error, vendorDTO ] = CreateVendorDTO.create( req.body )
        if( error ) return res.status(400).json({ error })
        
        new VendorUseCase.CreateVendor( this.vendorRepository )
            .execute( vendorDTO! )
            .then( vendor => res.json({
                status: 'success',
                msg: 'The Vendor has been registred successfully',
                payload: vendor
            }))
            .catch( error => res.status(400).json({
                status: 'error',
                msg: error
            }) )
    }

    getAllCentrals = ( req: Request, res: Response ) => {
        new VendorUseCase.GetVendors( this.vendorRepository )
            .execute()
            .then( vendor => res.json( vendor ) )
            .catch( error => res.status(400).json({ error }) )
    }

    getVendorById = ( req: Request, res: Response ) => {
        const { vendorid } = req.params
        new VendorUseCase.GetVendor( this.vendorRepository )
            .execute( vendorid )
            .then( vendor => res.json( vendor ) )
            .catch( error => res.status(400).json({ error }) )
    }

    updateVendor = ( req: Request, res: Response ) => {
        const { vendorid } = req.params
        const [ error, updateVendorDTO ] = UpdateVendorDTO.create({ id: vendorid, ...req.body })
        console.log(updateVendorDTO);
        if( error ) return res.status(400).json({ error })
        
        new VendorUseCase.UpdateCentral( this.vendorRepository )
            .execute( updateVendorDTO! )
            .then( vendor => res.json({
                msg: 'Vendor Information has been updated successfully',
                payload: vendor
            }))
            .catch( error => res.status(400).json({
                status: 'error',
                msg: error
            }))
    }

    deleteVendor = ( req: Request, res: Response ) => {
        const { vendorid } = req.params

        new VendorUseCase.DeleteVendor( this.vendorRepository )
            .execute( vendorid )
            .then( vendor => res.json({
                msg: 'The Vendor has been deleted successfully',
                payload: vendor
            }))
            .catch( error => res.status(400).json({
                status: 'error',
                msg: error
            }))
    }
}