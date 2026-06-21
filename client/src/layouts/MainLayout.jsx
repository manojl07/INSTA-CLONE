import { useState } from "react";
import Navbar from "../components/Navbar";
import CreatePostModal from "../components/CreatePostModel";

const MainLayout = ({ children }) => {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Navbar onOpenModal={() => setIsOpen(true)} />

      <CreatePostModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {children}
    </>
  )
}

export default MainLayout