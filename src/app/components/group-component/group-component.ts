import { Component, input, output } from '@angular/core';
import { Group } from '../../data/interfaces/group.interface';

@Component({
  selector: 'app-group',
  imports: [],
  templateUrl: './group-component.html',
  styleUrl: './group-component.scss',
  host: {
    '(click)': 'onClick()',
    '[class.hovered]': 'isSelected()'
  }
})
export class GroupComponent {
  public group = input.required<Group<any>>();
  public onSelected = output<Group<any> | undefined>();
  public isSelected = input<boolean>(false);

  protected onClick(): void {
    if (this.isSelected()) {
      this.onSelected.emit(undefined);
      return;
    }

    this.onSelected.emit(this.group());
  }
}
