import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, message, Select, Upload } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { FC, useEffect, useState } from "react";
import SelectWithAdd from "../../../components/select-with-add";
import { getSelectOptions } from "../../../helpers/formatting";
import { moviesService } from "../../../services";
import directorsService from "../../../services/directors";

interface IStringArray {
  [name: string]: string[];
}

const CreateMovie: FC = () => {
  const [types, setTypes] = useState<IStringArray | null>();
  const [genres, setGenres] = useState<IStringArray | null>();
  const [directors, setDirectors] = useState<IStringArray | null>();
  const [posterImage, setPosterImage] = useState<UploadFile | null>(null);

  useEffect(() => {
    getTableFilters(); //
  }, []);

  useEffect(() => {
    const fetchDirectors = async () => {
      const data = await directorsService.getDirectors();
      console.log("data", data);
    };
    fetchDirectors();
  }, []);

  const typesOptions = getSelectOptions(types);
  const genresOptions = getSelectOptions(genres);
  const directorsOptions = getSelectOptions(directors);

  const onUploadChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const fileValueHandler = (e: any) => {
    if (e.file) setPosterImage(e.file);
    if (!e.fileList.length) setPosterImage(null);
  };

  async function getTableFilters() {
    const { types, genres, directors } = await moviesService.getMoviesFilters();
    setTypes(types);
    setGenres(genres);
    setDirectors(directors);
  }

  const onFinish = (values: any) => {};
  return (
    <Form
      name="movie"
      onFinish={onFinish}
      style={{ width: "100%" }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input value!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Type"
        name="type"
        rules={[{ required: true, message: "Please input value!" }]}
        initialValue="movie"
      >
        <Select options={typesOptions} />
      </Form.Item>

      <Form.Item
        label="Plot"
        name="plot"
        rules={[{ required: true, message: "Please input value!" }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Full Plot"
        name="fullplot"
        rules={[{ required: true, message: "Please input value!" }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Year"
        name="year"
        rules={[{ required: true, message: "Please input value!" }]}
      >
        <DatePicker picker="year" />
      </Form.Item>

      <Form.Item
        label="Poster"
        name="poster"
        valuePropName="file"
        getValueFromEvent={fileValueHandler}
      >
        <Upload
          onChange={onUploadChange}
          name="icon"
          maxCount={1}
          accept="image/png, image/jpeg"
          beforeUpload={() => false}
          action=""
          listType="picture-card"
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Directors"
        name="directors"
        rules={[{ required: true, message: "Please select directors!" }]}
      >
        <SelectWithAdd options={directorsOptions} />
      </Form.Item>
    </Form>
  );
};

export default CreateMovie;
