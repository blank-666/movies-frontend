import { Button, Image, Popconfirm, Space } from "antd";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import _ from "lodash";
import type { SortOrder } from "antd/es/table/interface";
import { v4 } from "uuid";
import NavContainer from "../../../components/nav-container";
import { IMoviesList } from "../../../interfaces/movies.interface";
import { moviesService } from "../../../services";
import { capitalizeFirstLetter } from "../../../helpers/formatting";
import Table from "../../../components/table";

import "./style.scss";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { LoadingContext } from "../../../context/loading.context";
import { Link } from "react-router-dom";

interface IFilters {
  [name: string]: string[];
}

const renderImage = (url?: string) => {
  if (!url) return "---";
  return <Image width={200} src={url} />;
};

const renderArray = (array?: string[]) => {
  if (!array || !array.length) return "---";
  return array.join(", ");
};

const renderFavorite = (isFavorite?: boolean) => {
  return isFavorite ? <StarFilled /> : <StarOutlined />;
};

const navMenu = [
  { key: "add", label: "Add Movie", url: "/add" },
  { key: "edit", label: "Edit Movie", url: "/editrrrrr" },
];

const ManageMovies: FC = () => {
  const [refetchData, setRefetchData] = useState<boolean>(false);
  const [movies, setMovies] = useState<IMoviesList>([]);
  const [filters, setFilters] = useState<IFilters | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    getTableFilters();
  }, []);

  const tableColumns = [
    {
      title: "Favorite",
      dataIndex: "is_favorite",
      key: "is_favorite",
      render: renderFavorite,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: true,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      search: true,
    },
    {
      title: "Poster",
      dataIndex: "poster",
      key: "poster",
      render: renderImage,
    },
    {
      title: "Plot",
      dataIndex: "plot",
      key: "plot",
      search: true,
    },
    {
      title: "Genres",
      dataIndex: "genres",
      key: "genres",
      filters: filters?.genres?.map((filter) => ({
        text: capitalizeFirstLetter(filter),
        value: filter,
      })),
      render: renderArray,
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      sorter: true,
      sortDirections: ["ascend", "descend"] as SortOrder[],
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filters: filters?.types?.map((filter) => ({
        text: capitalizeFirstLetter(filter),
        value: filter,
      })),
      filterMultiple: false,
      // onFilter: () => true,
    },
  ];

  const dataSource = useMemo(() => {
    return movies?.map((item) => ({
      ...item,
      title: <Link to={`/movies/view/${item._id}`}>{item.title}</Link>,
      key: v4(),
    }));
  }, [movies]);

  async function getTableFilters() {
    const moviesFilters = await moviesService.getMoviesFilters();
    setFilters(moviesFilters);
  }

  const onReceivingData = (data: object[]) => {
    setMovies(data as IMoviesList);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const selectedIds = useMemo(() => {
    const ids: string[] = [];
    dataSource.forEach((row) => {
      if (selectedRowKeys.includes(row.key)) ids.push(row._id);
    });

    return ids;
  }, [dataSource, selectedRowKeys]);

  const onClickSelectedAction = async (cb: (ids: string[]) => Promise<{}>) => {
    setLoading(true);
    const data = await cb(selectedIds);
    if (data) {
      setTimeout(() => {
        setRefetchData(true);
        setSelectedRowKeys([]);
      }, 1000);
    } else {
      setLoading(false);
    }
  };

  return (
    <NavContainer menu={[]}>
      {selectedIds.length ? (
        <Space style={{ margin: "1rem", marginLeft: 0 }}>
          <Button
            icon={<StarFilled />}
            type="primary"
            onClick={() =>
              onClickSelectedAction(moviesService.toggleFavoriteMovies)
            }
          >
            Toggle Favorite
          </Button>
          <Popconfirm
            title="Delete the movies"
            description="Are you sure to delete these movies?"
            onConfirm={() => onClickSelectedAction(moviesService.deleteMovies)}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ) : null}
      <Table
        refetch={refetchData}
        onEndRefetch={() => setRefetchData(false)}
        getDataAction={moviesService.getAllMovies}
        onReceivingData={onReceivingData}
        data={dataSource}
        columns={tableColumns}
        rowSelection={rowSelection}
      />
    </NavContainer>
  );
};

export default ManageMovies;
