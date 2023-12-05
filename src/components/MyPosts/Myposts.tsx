import { Layout, Popconfirm, Spin, Typography } from "antd";
import React, { Key, useEffect, useRef, useState } from "react";
import Header from "../HomePage/Header";
import type {
  ActionType,
  EditableFormInstance,
  ProColumns,
  ProFormInstance,
} from "@ant-design/pro-components";
import { EditableProTable, ProForm } from "@ant-design/pro-components";
import { getComments } from "../CommentsPage/Utils/getComments";
import { getPostsForTable } from "../../Utils/getPostsForTable";
import { updateTable } from "../../Utils/updateTable";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../App";
import { IPost } from "../../Interface/IPost";

const { Text } = Typography;

type GithubIssueItem = {
  id?: string;
  post?: string;
  bio?: string;
  date?: string;
  postId?: string;
  profile?: string;
  userId?: string;
  username?: string;
  edited?: string;
  comment?: number;
  likes?: number;
  bookmarks?: number;
  index?: number;
};

const Myposts = () => {
  const [posts, setPosts] = useState<GithubIssueItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [comments, setComments] = useState<IPost[]>([]);
  const actionRef = useRef<ActionType>();
  const editableFormRef = useRef<EditableFormInstance>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef = useRef<ProFormInstance<any>>();
  const localStore = localStorage.getItem("userId");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [id, setId] = useState<any>();
  const [parentPost, setParentPost] = useState<GithubIssueItem>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [expandedRowKey, setExpandedRowKey] = useState<
    readonly Key[] | undefined
  >();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deletePost = async (data: any) => {
    await deleteDoc(doc(db, "posts", data?.postId));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deleteComment = async (data: any) => {
    actionRef.current?.reload();
    await deleteDoc(
      doc(db, "posts", data.parentPostId, "comments", data.postId)
    );

    const parentComment = doc(db, "posts", data.parentPostId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getDoc(parentComment).then((res: any) => {
      const obj = { comment: res?.data().comment - 1 };
      if (data.parentPostId === res.data().postId) {
        const updateLikeCount = doc(db, "posts", data.parentPostId);
        updateDoc(updateLikeCount, obj);
        actionRef.current?.reload();
      }
    });
  };

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: "Posts",
      dataIndex: "post",
      key: "post",
      width: 0,
      formItemProps: () => {
        return {
          rules: [{ required: true, message: "Please Enter valid post" }],
        };
      },
    },
    {
      title: "Likes",
      dataIndex: "likes",
      key: "likes",
      width: 100,
      formItemProps: () => {
        return {
          rules: [{ required: true, message: "Please Enter valid number" }],
        };
      },
      editable: false,
    },
    {
      title: "Bookmarks",
      dataIndex: "bookmarks",
      key: "bookmarks",
      width: 100,
      formItemProps: () => {
        return {
          rules: [{ required: true, message: "Please Enter valid number" }],
        };
      },
      editable: false,
    },
    {
      title: "Action",
      valueType: "option",
      width: 10,
      render: (_, row) => [
        <Text
          type="success"
          key="edit"
          onClick={() => {
            if (row.id !== undefined) {
              actionRef.current?.startEditable(row.id);
            }
          }}
          className={
            localStore === row.userId ? "display-edit" : "display-none"
          }
          style={{
            cursor: "pointer",
            border: "1px solid green",
            borderRadius: "8px",
            padding: "0px 5px",
            width: "60px",
            textAlign: "center",
          }}
        >
          Edit
        </Text>,
        <Popconfirm
          title="Delete this post?"
          key="delete"
          placement="leftTop"
          trigger="click"
          onConfirm={() => {
            const tableDataSource = formRef.current?.getFieldValue(
              "table"
            ) as GithubIssueItem[];

            formRef.current?.setFieldsValue({
              table: tableDataSource.filter((item) => item.id !== row?.id),
            });
            deletePost(row);
          }}
          className={
            localStore === row.userId ? "display-edit" : "display-none"
          }
        >
          <Text
            key="delete"
            type="danger"
            style={{
              cursor: "pointer",
              border: "1px solid red",
              borderRadius: "8px",
              padding: "0px 5px",
              width: "60px",
              textAlign: "center",
            }}
          >
            Delete
          </Text>
        </Popconfirm>,
      ],
    },
  ];

  const expandedRowRender = () => {
    return (
      <div>
        <ProForm<{
          protable: GithubIssueItem[];
        }>
          formRef={formRef}
          initialValues={{
            protable: comments,
          }}
          params={comments}
          request={async () => ({
            protable: comments,
          })}
          style={{ width: "100%", padding: "0 2% 0 2%" }}
          submitter={{
            submitButtonProps: {
              style: {
                display: "none",
              },
            },
            resetButtonProps: {
              style: {
                display: "none",
              },
            },
          }}
        >
          <EditableProTable
            rowKey="id"
            scroll={{
              x: true,
            }}
            editableFormRef={editableFormRef}
            controlled
            actionRef={actionRef}
            maxLength={10}
            name="protable"
            columns={[
              {
                title: "Date",
                editable: false,
                dataIndex: "date",
                key: "date",
                width: 100,
              },
              { title: "Comment", dataIndex: "post", key: "post", width: 0 },
              {
                title: "Action",
                valueType: "option",
                width: 10,
                render: (_, row) => [
                  <Text
                    type="success"
                    key="edit"
                    onClick={() => {
                      actionRef.current?.startEditable(row.id);
                    }}
                    className={
                      id === row.parentPostId && localStore === row.userId
                        ? "display-edit"
                        : "display-none"
                    }
                    style={{
                      cursor: "pointer",
                      border: "1px solid green",
                      borderRadius: "8px",
                      padding: "0px 5px",
                      width: "60px",
                      textAlign: "center",
                    }}
                  >
                    Edit
                  </Text>,
                  <Popconfirm
                    title="Delete this comment?"
                    key="delete"
                    placement="leftTop"
                    trigger="click"
                    onConfirm={async () => {
                      const tableDataSource = formRef.current?.getFieldValue(
                        "protable"
                      ) as GithubIssueItem[];

                      formRef.current?.setFieldsValue({
                        protable: tableDataSource.filter(
                          (item) => item.id !== row?.id
                        ),
                      });
                      deleteComment(row);
                    }}
                    className={
                      parentPost?.userId === localStore ||
                      localStore === row.userId
                        ? "display-edit"
                        : "display-none"
                    }
                  >
                    <Text
                      key="delete"
                      type="danger"
                      style={{
                        cursor: "pointer",
                        border: "1px solid green",
                        borderRadius: "8px",
                        padding: "0px 5px",
                        width: "60px",
                        textAlign: "center",
                      }}
                    >
                      Delete
                    </Text>
                  </Popconfirm>,
                ],
              },
            ]}
            editable={{
              type: "multiple",
              editableKeys,
              onChange: setEditableRowKeys,
            }}
            dateFormatter="string"
            headerTitle="Comments"
            pagination={false}
            recordCreatorProps={false}
          />
        </ProForm>
      </div>
    );
  };

  useEffect(() => {
    getPostsForTable(setPosts, setLoading);
  }, [comments]);

  return (
    <div style={{ width: "100%" }} data-table-myposts="table-myposts">
      <Layout className="margin-top">
        <Layout className="site-layout">
          <Header />
          <div className="table-div pro-table">
            {error ? (
              <p>Something went wrong please try later!</p>
            ) : (
              <>
                {loading ? (
                  <div className="loading-spin">
                    <Spin tip="Loading" size="large">
                      <div className="content" />
                    </Spin>
                  </div>
                ) : (
                  <ProForm<{
                    table: GithubIssueItem;
                  }>
                    formRef={formRef}
                    initialValues={{
                      table: posts,
                    }}
                    params={posts}
                    style={{ width: "100%", padding: "0 2% 0 2%" }}
                    submitter={{
                      submitButtonProps: {
                        style: {
                          display: "none",
                        },
                      },
                      resetButtonProps: {
                        style: {
                          display: "none",
                        },
                      },
                    }}
                  >
                    <EditableProTable
                      rowKey="id"
                      scroll={{
                        x: true,
                      }}
                      editableFormRef={editableFormRef}
                      controlled
                      actionRef={actionRef}
                      maxLength={10}
                      name="table"
                      columns={columns}
                      editable={{
                        type: "multiple",
                        editableKeys,
                        onChange: setEditableRowKeys,
                        onSave: async (rowKey, data) => {
                          updateTable(data);
                        },
                      }}
                      expandable={{
                        expandedRowRender,
                        onExpand(expanded, record) {
                          setExpandedRowKey([]);
                          setExpandedRowKey(record.id);
                          if (expanded) {
                            setParentPost(record);

                            getComments(
                              setError,
                              setComments,
                              setLoading,
                              record?.id
                            );
                          }
                        },
                        rowExpandable: (record) => record.comment !== 0,
                        onExpandedRowsChange: (record) => {
                          setId(record[0]);
                          setExpandedRowKey(record);
                        },
                        expandedRowKeys: expandedRowKey,
                      }}
                      dateFormatter="string"
                      headerTitle="Posts Table"
                      className="pro-table-main"
                      pagination={{ pageSize: 10 }}
                      style={{ padding: "10px" }}
                      recordCreatorProps={false}
                      options={{
                        reload: false,
                        setting: false,
                      }}
                    />
                  </ProForm>
                )}
              </>
            )}
          </div>
        </Layout>
      </Layout>
    </div>
  );
};

export default Myposts;
