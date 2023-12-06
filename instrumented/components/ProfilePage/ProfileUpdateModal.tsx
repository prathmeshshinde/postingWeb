import { Button, Form, Input, Modal } from "antd";
import React from "react";

interface IProp {
  isModalOpen: boolean;
  handleCancel: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFinish: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currUser: any;
}

const ProfileUpdateModal: React.FC<IProp> = ({
  isModalOpen,
  handleCancel,
  onFinish,
  currUser,
}) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <Modal
      title="Update Profile"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 400 }}
        data-submit-modal="cancel-submit-modal"
      >
        <Form.Item
          name={["username", "username"]}
          label="Username"
          initialValue={currUser?.username}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["profile", "profile"]}
          label="Image Link"
          initialValue={currUser?.profile}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["bio", "bio"]}
          label="Bio"
          initialValue={currUser?.bio}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          wrapperCol={{ ...layout.wrapperCol }}
          style={{ textAlign: "end" }}
        >
          <Button onClick={handleCancel} data-cancel-modal="cancel-modal">
            Cancel
          </Button>
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
  );
};

export default ProfileUpdateModal;
