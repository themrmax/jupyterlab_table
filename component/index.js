import React from 'react';
import {
  Table,
  Column,
  Cell
} from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.min.css';
// hack: `stream.Transform` (stream-browserify) is undefined in `csv-parse` when
// built with @jupyterlabextension-builder
// import infer from 'jsontableschema/lib/infer';
import infer from 'jsontableschema/lib/infer';
import './index.css';
import 'clusterize.js/clusterize.css';
import Clusterize from 'clusterize.js/clusterize.min.js';

const ROW_HEIGHT = 34;

function inferSchema(data) {
  const headers = data.reduce((result, row) => [...new Set([...result, ...Object.keys(row)])], []);
  const values = data.map(row => Object.values(row));
  return infer(headers, values);
}

export default class JSONTable extends React.Component {

  componentDidMount() {
    let { resources: [ { schema, data, ...options }] } = this.props;
    if (!schema) schema = inferSchema(data);
    // var rows = data.map(row => "1");
    var clusterize = new Clusterize({
      // rows: data.map(row => "<tr><td>" + Object.values(row).join("</td><td>") + "</td></tr>"),
      scrollId: 'scrollArea',
      contentId: 'contentArea'
    });
  }

  render() {
    return (
      <div className="clusterize">
        <table>
          <thead>
            <tr>
              <th>Headers</th>
            </tr>
          </thead>
        </table>
        <div id="scrollArea" className="clusterize-scroll">
          <table>
            <tbody id="contentArea" className="clusterize-content">
              <tr className="clusterize-no-data">
                <td>Loading data…</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

}
