import app from "./index.js";
import { PORT } from "./index.js";

//set the server to listen at port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
