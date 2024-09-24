import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCentral, deleteCentral, updateCentral } from '../../api'
import { CentralFormData } from '../../types';

export const useCentralMutation = () => {

    const queryClient = useQueryClient()
  
    const mutationCreateCentral = useMutation({
        mutationFn: createCentral,
        onError: (error) => {
          toast.error(error.message, { theme: 'colored' })
        },
        onSuccess: ( response ) => {
          if( response ) {
            const { msg, data } = response
            toast.success(`${msg} // ${data.codeName.toUpperCase()} - ${data.centralName.toUpperCase()} - ${data.siteCode.toUpperCase()}`, {
              theme: 'colored'
            })
          }
        }
      });

      const mutationUpdateCentral = useMutation({
        mutationFn: async ({ centralId, formData }: { centralId: string; formData: CentralFormData }) => await updateCentral({ id: centralId, formData }),
        onError: (error) => toast.error(error.message, { theme: 'colored' }),
        onSuccess: ( response ) => {
          console.log(response);
          if( response ) {
            const { msg, payload } = response

            toast.success(`${msg} // ${payload.codeName.toUpperCase()} - ${payload.centralName.toUpperCase()} - ${payload.siteCode.toUpperCase()}`, {
              theme: 'colored'
            })
          }
        }
    });

    const mutationDeleteCentral = useMutation({
      mutationFn: async ({ centralId }: { centralId: string }) => {
        const response = await deleteCentral( centralId )
        if (!response) {
          throw new Error('Delete operation failed');
        }
        return response;
      },
      onError: (error) => toast.error(error.message, { theme: 'colored' }),
        onSuccess: ( response ) => {
          if( response ) {
            queryClient.invalidateQueries({
              queryKey: ['centrals']
            })
            const { msg, payload } = response
            toast.success(`${msg} // ${payload.codeName.toUpperCase()} - ${payload.centralName.toUpperCase()} - ${payload.siteCode.toUpperCase()}`, {
              theme: 'colored'
            })
          }
        }
    })

      return {
        mutationCreateCentral,
        mutationUpdateCentral,
        mutationDeleteCentral
      }
}
// import { toast } from 'react-toastify'
// import { useMutation } from '@tanstack/react-query'
// import { createCentral } from '../../api'

// export const useCentralMutation = () => {
    
// //   const queryCentral = useQueryClient()
  
//     const mutationCreateCentral = useMutation({
//         mutationFn: createCentral,
//         onError: (error) => {
//           toast.error(error.message, { theme: 'colored' })
//         },
//         onSuccess: ({ msg, data }) => {
//           toast.success(`${msg} // ${data.codeName.toUpperCase()} ${data.centralName.toUpperCase()} ${data.siteCode.toUpperCase()}`, {
//             theme: 'colored'
//           })
//         }
//       })
      
//     //   const mutationUpdateCentral = useMutation({
        
//     //     mutationFn: async ({ centralId, formData }) => await updateByIdCentral( centralId, formData ),
//     //     onError: (error) => toast.error(error.message, { theme: 'colored' }),
//     //     onSuccess: ({ msg, data }) => {
//     //       queryCentral.invalidateQueries([ "central", data.id ])
//     //       toast.success(`${msg} // Codigo: ${data.codeName} - Central: ${data.centralName} - Emplazamiento: ${data.siteCode}`, {
//     //         theme: 'colored'
//     //       })
//     //     }
//     //   })

//     //   const mutationDeleteCentral = useMutation({
//     //     mutationFn: async ( centralId ) => await deleteByIdCentral( centralId ),
//     //     onError: (error) => toast.error(error.message, { theme: 'colored' }),
//     //     onSuccess: ({ msg }) => {
//     //       queryCentral.invalidateQueries([ "central" ])
//     //       toast.success( msg , { theme: 'colored' })
//     //     }
//     //   })

//       return {
//         mutationCreateCentral,
//         // mutationUpdateCentral,
//         // mutationDeleteCentral,
//       }
// }