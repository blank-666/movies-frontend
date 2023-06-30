import { FC, useState, useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Select,
  Upload,
  message,
} from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";

import SearchSelect from "../search-select";

import { moviesService, directorsService, actorsService } from "../../services";
import { convertToFormData, getSelectOptions } from "../../helpers/formatting";

import { PlusOutlined } from "@ant-design/icons";

interface IMovieForm {
  form: FormInstance;
  editMode?: boolean;
  onFinish: (values: any) => Promise<any>;
}

interface IStringArray {
  [name: string]: string[];
}

const MovieForm: FC<IMovieForm> = ({ form, editMode, onFinish }) => {
  const [types, setTypes] = useState<IStringArray | null>();
  const [genres, setGenres] = useState<IStringArray | null>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    getTableFilters();
  }, []);

  useEffect(() => {
    const posterFile = form.getFieldValue("poster");
    if (posterFile) {
      setFileList([posterFile]);
    }
  }, [form.getFieldValue("poster")]);

  const typesOptions = getSelectOptions(types);
  const genresOptions = getSelectOptions(genres);

  const onUploadChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }

    setFileList(info.fileList);
  };

  const fileValueHandler = (e: any) => {
    if (e.fileList && e.fileList.length) return e.fileList[0];
    return null;
  };

  async function getTableFilters() {
    const { types, genres } = await moviesService.getMoviesFilters();
    setTypes(types);
    setGenres(genres);
  }

  async function onSubmit(values: any) {
    // if user don't update movie poster
    if (values.poster?.uid === "-1") delete values.poster;

    const formData = convertToFormData(values);
    await onFinish(formData);
  }

  return (
    <Form
      name="movie"
      form={form}
      onFinish={onSubmit}
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
      <Form.Item label="Full Plot" name="fullplot">
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
          fileList={fileList}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>
      <Form.Item label="Genres" name="genres">
        <Select options={genresOptions} mode="multiple" />
      </Form.Item>
      <Form.Item
        label="Directors"
        name="directors"
        rules={[{ required: true, message: "Please select directors!" }]}
      >
        <SearchSelect
          mode="multiple"
          placeholder="Select directors"
          fetchOptions={directorsService.getDirectors}
          addItem={directorsService.addDirector}
          searchBy="name"
          name="director"
        />
      </Form.Item>
      <Form.Item label="Actors" name="actors">
        <SearchSelect
          mode="multiple"
          placeholder="Select actors"
          fetchOptions={actorsService.getActors}
          addItem={actorsService.addActor}
          searchBy="name"
          name="actor"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {editMode ? "Update" : "Create"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MovieForm;
