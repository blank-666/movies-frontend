import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, message, Select, Upload } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { FC, useEffect, useState } from "react";
import { getSelectOptions } from "../../../helpers/formatting";
import { moviesService } from "../../../services";
import directorsService from "../../../services/directors";
import SearchSelect from "../../../components/search-select";
import actorsService from "../../../services/actors";
import { useNavigate } from "react-router";

interface IStringArray {
  [name: string]: string[];
}

const CreateMovie: FC = () => {
  const navigate = useNavigate();

  const [types, setTypes] = useState<IStringArray | null>();
  const [genres, setGenres] = useState<IStringArray | null>();

  useEffect(() => {
    getTableFilters();
  }, []);

  const typesOptions = getSelectOptions(types);
  const genresOptions = getSelectOptions(genres);

  const onUploadChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
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

  const convertToFormData = (values: any) => {
    const data = new FormData();
    const valuesKeys = Object.keys(values);

    for (const key of valuesKeys) {
      const value = values[key];

      if (!value) continue;
      if (value?.originFileObj) {
        data.append(key, value.originFileObj);
      } else data.append(key, values[key]);
    }

    return data;
  };

  const onFinish = async (values: any) => {
    values.test = true;

    const formData = convertToFormData(values);

    const response = await moviesService.createMovie(formData);

    if (response.id) navigate(`/`);
    navigate(`/movies/view/${response.id}`);
  };

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
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateMovie;
