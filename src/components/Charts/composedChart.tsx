import { useMemo, useCallback } from 'react';
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { withTheme } from 'styled-components';

export default withTheme(({ theme, timeSeriesData }) => {
  const styles = useMemo(
    () => ({
      contentStyle: {
        borderRadius: '6px',
        borderColor: theme.colors.lightGrey,
      },

      labelStyle: {
        fontWeight: '700',
        fontSize: '0.8em',
        paddingBottom: '4px',
        marginBottom: '12px',
        borderBottom: `1px solid ${theme.colors.superLightGrey}`,
      },

      itemStyle: {
        marginBottom: '0px',
        marginTop: '0px',
      },
    }),
    [theme]
  );

  const parseDate = useCallback((date, itemNum = 3) => {
    const splitted = date.split('-');
    if (splitted?.length >= itemNum) {
      return splitted
        .slice(splitted.length - itemNum)
        .reverse()
        .join('/');
    }
    return date;
  }, []);

  return (
    <ComposedChart
      width={600}
      height={500}
      data={timeSeriesData}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="date" tickFormatter={date => parseDate(date, 2)} />
      <YAxis />
      <Tooltip
        contentStyle={styles.contentStyle}
        labelStyle={styles.labelStyle}
        itemStyle={styles.itemStyle}
        labelFormatter={parseDate}
      />
      <Legend />

      <Bar dataKey="confirmed" barSize={20} stroke={theme.colors.blue} fill={theme.colors.darkBlue} />
      <Area type="monotone" dataKey="recovered" stroke={theme.colors.primary} fill={theme.colors.primary} />
      <Line type="monotone" dataKey="deaths" stroke={theme.colors.yellow} dot={{ r: 2 }} />
    </ComposedChart>
  );
});
