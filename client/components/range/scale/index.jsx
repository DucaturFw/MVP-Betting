import React, { Component } from 'react';
import styled from 'styled-components';

import Lines from './lines';
import Labels from './labels';

export default function ({ tokens, curr }) {
  return (
    <Wrap>
      <StyledLines curr={curr} tokens={tokens} />
      <Labels curr={curr} />
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
`;

const StyledLines = styled(Lines) `
  top: 80px;
`;

/**
 *       
 * <div className="group5">
        <img className="line" src="./images/mvp  newline.png" />
        <img className="line1" src="./images/mvp  newline  1.png" />
        <img className="line2" src="./images/mvp  newline  1.png" />
        <div className="group">
          <img className="path" src="./images/mvp  newpath.png" />
          <img className="path1" src="./images/mvp  newpath  3.png" />
          <img className="path2" src="./images/mvp  newpath  3.png" />
          <img className="path3" src="./images/mvp  newpath  3.png" />
          <img className="path4" src="./images/mvp  newpath  3.png" />
          <img className="path5" src="./images/mvp  newpath  3.png" />
          <img className="path6" src="./images/mvp  newpath  3.png" />
          <img className="path7" src="./images/mvp  newpath  3.png" />
          <img className="path8" src="./images/mvp  newpath  3.png" />
        </div>
        <div className="a6000">$6000</div>
        <div className="a7000">$7000</div>
        <div className="a8000">$8000</div>
        <div className="a9000">$9000</div>
        <div className="a10000">$10000</div>
        <div className="a70001">$7000</div>
        <div className="a3000">$3000</div>
        <div className="a4000">$4000</div>
        <div className="a5000">$5000</div>
      </div>
      <div className="group3">
        <img className="line21" src="./images/mvp  newline 2  35.png" />
        <img className="line22" src="./images/mvp  newline 2  35.png" />
        <img className="line23" src="./images/mvp  newline 2  35.png" />
        <img className="line24" src="./images/mvp  newline 2  35.png" />
        <img className="line25" src="./images/mvp  newline 2  35.png" />
        <img className="line26" src="./images/mvp  newline 2  35.png" />
        <img className="line27" src="./images/mvp  newline 2  35.png" />
        <img className="line28" src="./images/mvp  newline 2  35.png" />
        <img className="line29" src="./images/mvp  newline 2  35.png" />
      </div>
      <div className="group31">
        <img className="line210" src="./images/mvp  newline 2  35.png" />
        <img className="line211" src="./images/mvp  newline 2  35.png" />
        <img className="line212" src="./images/mvp  newline 2  35.png" />
        <img className="line213" src="./images/mvp  newline 2  35.png" />
        <img className="line214" src="./images/mvp  newline 2  35.png" />
        <img className="line215" src="./images/mvp  newline 2  35.png" />
        <img className="line216" src="./images/mvp  newline 2  35.png" />
        <img className="line217" src="./images/mvp  newline 2  35.png" />
        <img className="line218" src="./images/mvp  newline 2  35.png" />
      </div>
      <div className="group32">
        <img className="line219" src="./images/mvp  newline 2  35.png" />
        <img className="line220" src="./images/mvp  newline 2  35.png" />
        <img className="line221" src="./images/mvp  newline 2  35.png" />
        <img className="line222" src="./images/mvp  newline 2  35.png" />
        <img className="line223" src="./images/mvp  newline 2  35.png" />
        <img className="line224" src="./images/mvp  newline 2  35.png" />
        <img className="line225" src="./images/mvp  newline 2  35.png" />
        <img className="line226" src="./images/mvp  newline 2  35.png" />
        <img className="line227" src="./images/mvp  newline 2  35.png" />
      </div>
      <div className="part">
        <img className="line228" src="./images/mvp  newline 2  35.png" />
        <img className="line229" src="./images/mvp  newline 2  35.png" />
        <img className="line230" src="./images/mvp  newline 2  35.png" />
        <img className="line231" src="./images/mvp  newline 2  35.png" />
        <img className="line232" src="./images/mvp  newline 2  35.png" />
        <img className="line233" src="./images/mvp  newline 2  35.png" />
        <img className="line234" src="./images/mvp  newline 2  35.png" />
        <img className="line235" src="./images/mvp  newline 2  35.png" />
        <img className="line236" src="./images/mvp  newline 2  35.png" />
      </div>
      <div className="part1">
        <img className="line237" src="./images/mvp  newline 2  35.png" />
        <img className="line238" src="./images/mvp  newline 2  35.png" />
        <img className="line239" src="./images/mvp  newline 2  35.png" />
        <img className="line240" src="./images/mvp  newline 2  35.png" />
        <img className="line241" src="./images/mvp  newline 2  35.png" />
        <img className="line242" src="./images/mvp  newline 2  35.png" />
        <img className="line243" src="./images/mvp  newline 2  35.png" />
        <img className="line244" src="./images/mvp  newline 2  35.png" />
        <img className="line245" src="./images/mvp  newline 2  35.png" />
      </div>
      <div className="part2">
        <img className="line246" src="./images/mvp  newline 2  35.png" />
        <img className="line247" src="./images/mvp  newline 2  35.png" />
        <img className="line248" src="./images/mvp  newline 2  35.png" />
        <img className="line249" src="./images/mvp  newline 2  35.png" />
        <img className="line250" src="./images/mvp  newline 2  35.png" />
        <img className="line251" src="./images/mvp  newline 2  35.png" />
        <img className="line252" src="./images/mvp  newline 2  35.png" />
        <img className="line253" src="./images/mvp  newline 2  35.png" />
        <img className="line254" src="./images/mvp  newline 2  35.png" />
      </div>
      <div className="part3">
        <img className="line255" src="./images/mvp  newline 2  35.png" />
        <img className="line256" src="./images/mvp  newline 2  35.png" />
        <img className="line257" src="./images/mvp  newline 2  35.png" />
        <img className="line258" src="./images/mvp  newline 2  35.png" />
        <img className="line259" src="./images/mvp  newline 2  35.png" />
        <img className="line260" src="./images/mvp  newline 2  35.png" />
        <img className="line261" src="./images/mvp  newline 2  35.png" />
        <img className="line262" src="./images/mvp  newline 2  35.png" />
        <img className="line263" src="./images/mvp  newline 2  35.png" />
      </div>
      <div className="part4">
        <img className="line264" src="./images/mvp  newline 2  35.png" />
        <img className="line265" src="./images/mvp  newline 2  35.png" />
        <img className="line266" src="./images/mvp  newline 2  35.png" />
        <img className="line267" src="./images/mvp  newline 2  35.png" />
        <img className="line268" src="./images/mvp  newline 2  35.png" />
        <img className="line269" src="./images/mvp  newline 2  35.png" />
        <img className="line270" src="./images/mvp  newline 2  35.png" />
        <img className="line271" src="./images/mvp  newline 2  35.png" />
        <img className="line272" src="./images/mvp  newline 2  35.png" />
      </div>
      <div className="r-ed">
        <div className="rectangle2" />
        <div className="rectangle21" />
        <div className="rectangle22" />
        <div className="rectangle23" />
        <div className="rectangle24" />
        <div className="rectangle25" />
        <div className="rectangle26" />
        <div className="rectangle27" />
        <div className="rectangle28" />
        <div className="rectangle29" />
        <div className="rectangle210" />
        <div className="rectangle211" />
        <div className="rectangle212" />
        <div className="rectangle213" />
        <div className="rectangle214" />
        <div className="rectangle215" />
        <div className="rectangle216" />
        <div className="rectangle217" />
        <div className="rectangle218" />
        <div className="rectangle219" />
        <div className="rectangle220" />
        <div className="rectangle221" />
        <div className="rectangle222" />
        <div className="rectangle223" />
        <div className="rectangle224" />
        <div className="rectangle225" />
        <div className="rectangle226" />
        <div className="rectangle227" />
        <div className="rectangle228" />
      </div>
      <div className="g-reen">
        <div className="rectangle229" />
        <div className="rectangle230" />
        <div className="rectangle231" />
        <div className="rectangle232" />
        <div className="rectangle233" />
        <div className="rectangle234" />
        <div className="rectangle235" />
        <div className="rectangle236" />
        <div className="rectangle237" />
        <div className="rectangle238" />
        <div className="rectangle239" />
        <div className="rectangle240" />
        <div className="rectangle241" />
        <div className="rectangle242" />
        <div className="rectangle243" />
        <div className="rectangle244" />
        <div className="rectangle245" />
        <div className="rectangle246" />
        <div className="rectangle247" />
        <div className="rectangle248" />
        <div className="rectangle249" />
        <div className="rectangle250" />
        <div className="rectangle251" />
        <div className="rectangle252" />
        <div className="rectangle253" />
        <div className="rectangle254" />
        <div className="rectangle255" />
        <div className="rectangle256" />
        <div className="rectangle257" />
        <div className="rectangle258" />
        <div className="rectangle259" />
        <div className="rectangle260" />
        <div className="rectangle261" />
        <div className="rectangle262" />
        <div className="rectangle263" />
        <div className="rectangle264" />
        <div className="rectangle265" />
        <div className="rectangle266" />
        <div className="rectangle267" />
        <div className="rectangle268" />
        <div className="rectangle269" />
        <div className="rectangle270" />
        <div className="rectangle271" />
        <div className="rectangle272" />
        <div className="rectangle273" />
        <div className="rectangle274" />
      </div>
 */
