import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../App";
import { message } from "antd";
import { IPost } from "../../../Interface/IPost";

export const getComments = async (
  setError: React.Dispatch<React.SetStateAction<string>>,
  setComments: React.Dispatch<React.SetStateAction<IPost[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  id: string
) => {
  setComments([]);
  const docRef = collection(db, "posts", id, "comments");
  getDocs(docRef)
    .then((snapshot) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const commentDocs: any[] = [];

      //using for each to add document in to commentDocs array
      snapshot.docs.forEach((doc) => {
        const options: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        };

        const visibleDate = new Date(doc.data().date).toLocaleString(
          "en-GB",
          options
        );

        commentDocs.push({
          ...doc.data(),
          id: doc.id,
          visibleDate: visibleDate,
        });
      });

      // Sorting the commentDocs array which consist of comments by descending order
      const orderedComments = commentDocs.sort((a, b) => {
        return b.date - a.date;
      });

      setComments(orderedComments);
      setLoading(false);
    })
    .catch((err) => {
      message.error("Something went wrong!");
      setError(err.message);
    });
};
