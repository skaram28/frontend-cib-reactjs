import Swal from "sweetalert2";

export const Logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    
    Swal.fire({
            icon: "success",
            title: "Logout Successful",
            text: `You have been logged out successfully.`,
            confirmButtonColor: "#0c3c60",
          })
  return <></>;
};

export default Logout;
