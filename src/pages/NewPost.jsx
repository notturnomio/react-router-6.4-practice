// import { useState } from "react";
import {
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";

import NewPostForm from "../components/NewPostForm";
import { savePost } from "../util/api";

function NewPostPage() {
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [error, setError] = useState();
  const data = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();

  // async function submitHandler(event) {
  //   event.preventDefault();
  //   setIsSubmitting(true);
  //   try {
  //     const formData = new FormData(event.target);
  //     const post = {
  //       title: formData.get('title'),
  //       body: formData.get('post-text'),
  //     };
  //     await savePost(post);
  //     navigate('/');
  //   } catch (err) {
  //     setError(err);
  //   }
  //   setIsSubmitting(false);
  // }

  function cancelHandler() {
    navigate("/blog");
  }

  return (
    <>
      {/* {error && <p>{error.message}</p>} */}
      {data && data.status && <p>{data.message}</p>}
      <NewPostForm
        onCancel={cancelHandler}
        // onSubmit={submitHandler}
        // submitting={isSubmitting}
        submitting={navigation.state === "submitting"}
      />
    </>
  );
}

export default NewPostPage;

export async function action({ request }) {
  const formData = await request.formData();
  const post = {
    title: formData.get("title"),
    body: formData.get("post-text"),
  };
  try {
    await savePost(post);
  } catch (error) {
    if (error.status === 422) {
      return error;
    }
    throw error;
  }
  return redirect("/blog");
}
