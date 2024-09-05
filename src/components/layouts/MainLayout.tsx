import { FC } from "react";

import Navbar from "@/components/organisms/Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {

  return (
    
    <main>
      <Navbar/>
      {children}
    </main>
  )


}

export default MainLayout