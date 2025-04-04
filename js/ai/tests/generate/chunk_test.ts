/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as assert from 'assert';
import { describe, it } from 'node:test';
import { GenerateResponseChunk } from '../../src/generate.js';

describe('GenerateResponseChunk', () => {
  describe('text accumulation', () => {
    const testChunk = new GenerateResponseChunk(
      { index: 0, role: 'model', content: [{ text: 'new' }] },
      {
        previousChunks: [
          { index: 0, role: 'model', content: [{ text: 'old1' }] },
          { index: 0, role: 'model', content: [{ text: 'old2' }] },
        ],
      }
    );

    it('#previousText should concatenate the text of previous parts', () => {
      assert.strictEqual(testChunk.previousText, 'old1old2');
    });

    it('#accumulatedText should concatenate previous with current text', () => {
      assert.strictEqual(testChunk.accumulatedText, 'old1old2new');
    });
  });
});
