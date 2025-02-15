import React from 'react'
import {Sandpack} from '@codesandbox/sandpack-react';
import Constants from '@/data/Constants';
import {aquaBlue} from '@codesandbox/sandpack-themes'

const CodeEditor = ({viewCode, isCompleted}:{viewCode:string, isCompleted:Boolean}) => {
  return (
    <div>
      <Sandpack 
        template='react'
        theme={aquaBlue}
        options={{
          externalResources: ["https://cdn.tailwindcss"],
          showNavigator: true,
          showTabs: true,
          editorHeight: 740
        }}
        customSetup={{
          dependencies: {
            ...Constants.DEPENDENCY
          }
        }}
        files={{
          "/App.js": `${viewCode}`,
        }}
      />
    </div>
  )
}

export default CodeEditor