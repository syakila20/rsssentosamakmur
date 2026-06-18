import DoctorCard from "@/Component/Section/Doctor/CardDoctor";
import Title from "@/Component/Title/Title";
import { IDoctorCard } from "@/types/type";
import React from "react";

interface IListDokterRelated {
  doctor: IDoctorCard[];
  category: string;
}

const ListDokterRelated: React.FC<IListDokterRelated> = (props) => {
  return (
    <div className="flex-col">
      <Title title={`Dokter ${props?.category || ""} Lainnya`} />
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 mt-6">
        {props?.doctor?.map((doctor, idx) => (
          <DoctorCard key={doctor?.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default ListDokterRelated;
