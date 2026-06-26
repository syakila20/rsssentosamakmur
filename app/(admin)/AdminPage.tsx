import FooterAdmin from "@/Component/Footer/FooterAdmin";
import { SectionTitle } from "@/Component/Typography/Typhography";
import React from "react";

interface IAdminPage {
  children: React.ReactNode;
  footer?: React.ReactNode;
  title: string;
  footerLeftActions?: React.ReactNode[];
  footerRightActions?: React.ReactNode[];
}

const AdminPage: React.FC<IAdminPage> = ({
  children,
  footerLeftActions,
  footerRightActions,
  title,
}) => {
  const renderFooter = () => {
    if (!footerLeftActions && !footerRightActions) {
      return null;
    }
    return (
      <FooterAdmin
        leftActions={footerLeftActions}
        rightActions={footerRightActions}
      />
    );
  };
  return (
    <div className="flex flex-col min-h-screen relative ">
      <div
        className="
        flex-1
        space-y-4
        py-6
        pb-28
        p-6 
        "
      >
        <div className="shrink-0">
          <SectionTitle>{title}</SectionTitle>
        </div>
        {children}
      </div>
      {renderFooter()}
    </div>
  );
};

export default AdminPage;
