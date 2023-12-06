import { Button, Form, Input, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../App";

interface IProp {
  isModalOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleCancel: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: any;
  toUpdateComments: boolean;
  setToUpdateComments: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parentPost: any;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdatePostModal: React.FC<IProp> = ({
  isModalOpen,
  handleCancel,
  post,
  toUpdateComments,
  setToUpdateComments,
  parentPost,
  setIsModalOpen,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [date, setDate] = useState<any>();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    try {
      const updateProfile = doc(db, "posts", parentPost, "comments", post?.id);
      await updateDoc(updateProfile, {
        post: values.post.post,
        date: date,
        edited: "Edited",
      });
      message.success("Post updated");
      setToUpdateComments(!toUpdateComments);
      setIsModalOpen(false);
      handleCancel();
    } catch (err) {
      console.log(err);
    }

    try {
      const updateProfile = doc(db, "posts", post?.id);
      await updateDoc(updateProfile, {
        post: values.post.post,
        date: date,
        edited: "Edited",
      });
      message.success("Post updated");
      setIsModalOpen(false);
      setToUpdateComments(!toUpdateComments);
      handleCancel();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const current = Date.now();
    setDate(current);
  }, []);

  return (
    <div>
      <Modal
        title="Update Post"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        data-isModalOpen="isModalOpen"
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 400 }}
          data-update-post-modal="update-post-modal"
        >
          <Form.Item
            name={["post", "post"]}
            label="Post"
            initialValue={post?.post}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            wrapperCol={{ ...layout.wrapperCol }}
            style={{ textAlign: "end" }}
          >
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              style={{ margin: "0px 0px 0px 10px" }}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdatePostModal;
