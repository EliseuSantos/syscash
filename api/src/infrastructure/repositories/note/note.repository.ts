import { NoteDocument } from '@domain/entities/note';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class NoteRepository {
  constructor(
    @InjectModel('Note')
    private readonly noteModel: Model<NoteDocument>,
  ) {}

  async getNotes(filter = {}): Promise<NoteDocument[]> {
    return this.noteModel
      .find(filter)
      .sort([['value', -1]])
      .exec();
  }

  async removeItemOnNote(note): Promise<NoteDocument> {
    const noteData = await this.noteModel
      .findOne(new Types.ObjectId(note._id))
      .exec();
    const removedItem = noteData.items.pop();

    noteData.update(
      { _id: note._id },
      { $pull: { results: { $elemMatch: { _id: removedItem._id } } } },
    );

    return noteData;
  }
}
