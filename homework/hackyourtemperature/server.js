import app from "./app.js";
import { PORT } from "./app.js";

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
