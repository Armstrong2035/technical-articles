import books from "./LibraryInventory";
import checkAvilabbility from "./LibraryInventory";

const handleSuccess = (resolvedValue) => {
  console.log(resolvedValue);
};

const handleFailure = (rejectedValue) => {
  console.log(rejectedValue);
};

checkAvailability("Hard Drive", 5).then(handleSuccess, handleFailure);
