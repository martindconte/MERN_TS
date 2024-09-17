import { BtnNavCentral, FormCentral } from "../../components";
import { useCentralMutation } from "../../hook";
import { CentralFormData } from "../../types";

export const NewCentralView = () => {

  const { mutationCreateCentral } = useCentralMutation()

  const handleForm = (data: CentralFormData) => {
      mutationCreateCentral.mutateAsync( data );
  };

  return (
    <main className="flex-1 bg-stone-900">
      <h2 className="w-1/2 mx-auto text-3xl font-extrabold uppercase my-5 text-center text-white">
        Carga de <span className="text-emerald-600">Nueva</span> Central
      </h2>
      <div className="w-1/3 mx-auto">
        <FormCentral
          onSubmit={ handleForm }
          status={ mutationCreateCentral.status }
          requiredFields
        />
        <BtnNavCentral />
      </div>
    </main>
  );
};
