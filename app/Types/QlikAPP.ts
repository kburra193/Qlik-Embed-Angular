export class QlikApp {
  id: number | undefined;
  name: string | undefined;
  routeType!: string;
  link!: string;
  thumbnail: string | undefined;
}

export type QlikAppDto = {
  page: number;
  results: QlikApp[];
  total_pages: number;
  total_results: number;
};

export type Genre = {
  id: number;
  name: string;
};
