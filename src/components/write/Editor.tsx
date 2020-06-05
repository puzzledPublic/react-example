import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import { ChangeFieldInfo } from '../../modules/write';

const EditorBlock = styled(Responsive)`
  /* 페이지 위아래 여백 지정 */
  padding: 5rem 0;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
  width: 100%;
`;

const QuillWrapper = styled.div`
  /*최소, 최대 크기 지정, padding 제거 */
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before {
    left: 0px;
  }
`;

interface EditorPropType {
  title: string;
  body: string;
  onChangeField: (payload: ChangeFieldInfo) => void;
}

function Editor({ title, body, onChangeField }: EditorPropType) {
  const quillElement = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current || '', {
      theme: 'bubble',
      placeholder: '내용을 작성하세요...',
      modules: {
        toolbar: [
          // https://quilljs.com/docs/modules/toolbar/ 참고
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block', 'link', 'image'],
        ],
      },
    });

    // quill에 text-change 이벤트 핸들러 등록
    // 참고: https://quilljs.com/docs/api/#events
    const quill = quillInstance.current;
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        onChangeField({ key: 'body', value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  const mounted = useRef<boolean>(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    if (quillInstance.current) {
      quillInstance.current.root.innerHTML = body;
    }
  }, [body]);

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeField({ key: 'title', value: event.target.value });
  };

  return (
    <EditorBlock>
      <TitleInput
        onChange={onChangeTitle}
        value={title}
        placeholder="제목을 입력하세요..."
      />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorBlock>
  );
}

export default Editor;
