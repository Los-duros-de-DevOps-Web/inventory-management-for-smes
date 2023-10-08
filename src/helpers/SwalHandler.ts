import Swal from "sweetalert2";

const throwSwal = (title: string, text: string, icon: any) => {
  Swal.fire({
    title,
    text,
    icon,
  });
}

const throwSwalWithTimer = (title: string, text: string, icon: any, timer: number) => {
  Swal.fire({
    title,
    text,
    icon,
    timer,
    timerProgressBar: true,
  });
}

const throwSwalWithConfirm = (title: string, text: string, icon: any, confirmButtonText: string) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
  });
}

const throwSwalWithConfirmAndTimer = (title: string, text: string, icon: any, confirmButtonText: string, timer: number) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
    timer,
    timerProgressBar: true,
  });
}

const throwSwalWithConfirmAndCancelButton = (title: string, text: string, icon: any, confirmButtonText: string, cancelButtonText: string) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
    cancelButtonText,
  });
}

const SwalsFunctions = {
  throwSwal,
  throwSwalWithTimer,
  throwSwalWithConfirm,
  throwSwalWithConfirmAndTimer,
  throwSwalWithConfirmAndCancelButton,
}
export default SwalsFunctions;